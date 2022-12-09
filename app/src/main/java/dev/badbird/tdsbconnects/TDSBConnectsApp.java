package dev.badbird.tdsbconnects;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.preference.PreferenceManager;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.regex.Pattern;

import dev.badbird.tdsbconnects.data.model.LoggedInUser;
import dev.badbird.tdsbconnects.ui.home.HomeFragment;
import dev.badbird.tdsbconnects.ui.home.MainActivity;
import dev.badbird.tdsbconnectsapi.TDSBConnects;
import dev.badbird.tdsbconnectsapi.schema.request.impl.timetable.TimeTableRequest;
import dev.badbird.tdsbconnectsapi.schema.response.impl.TimeTableResponse;
import dev.badbird.tdsbconnectsapi.util.Utilities;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.java.Log;

@Getter
@Setter
@Log
public class TDSBConnectsApp {
    private TDSBConnects tdsbConnects;
    @Getter
    private static TDSBConnectsApp instance = new TDSBConnectsApp();

    private TDSBConnectsApp() {
    }

    private static final Pattern SPLIT_PATTERN = Pattern.compile("(,|\\||\\s)+"); // split by , or | or space
    public List<String> getClassCodesToExclude(Context context) {
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        String name = prefs.getString("hide_courses_preference", "");
        return Arrays.asList(SPLIT_PATTERN.split(name));
    }

    public CompletableFuture<LoggedInUser> login(String username, String password) {
        CompletableFuture<LoggedInUser> future = new CompletableFuture<>();
        tdsbConnects = new TDSBConnects(username, password, () -> {
            LoggedInUser user = new LoggedInUser(username, tdsbConnects.getUserData().getUserName());
            future.complete(user);
        }, future::completeExceptionally);
        return future;
    }

    public void logout() {
        // TODO: do nothing for now, logout endpoint seems to be broken anyway
    }

    @SuppressLint("SimpleDateFormat")
    private static final DateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");

    public CompletableFuture<TimeTableResponse.Course[]> getCoursesForDay(Date date, int schoolId, Context context) { // TODO caching, this is very important!
        String dateStr = dateFormat.format(date); // this is so braindead
        TimeTableRequest request = new TimeTableRequest(schoolId, dateStr);
        CompletableFuture<TimeTableResponse.Course[]> future = new CompletableFuture<>();
        tdsbConnects.call(request).thenAccept(response -> {
            List<TimeTableResponse.Course> courses = response.getCourseTable();
            future.complete(courses.stream().filter(course -> !getClassCodesToExclude(context).contains(course.getStudentCourse().getClassCode())).toArray(TimeTableResponse.Course[]::new));
        });
        return future;
    }

    public CompletableFuture<TimeTableResponse.Course> getNextCourse(int schoolId, Context context) {
        return getCoursesForDay(new Date(), schoolId, context).thenApply(courses -> {
            long now = System.currentTimeMillis();
            for (TimeTableResponse.Course course : courses) {
                long startTime = Utilities.parseDateToUnixMillis(course.getStudentCourse().getStartTime());
                long endTime = Utilities.parseDateToUnixMillis(course.getStudentCourse().getEndTime());
                log.info("Checking course " + course.getStudentCourse().getClassCode() + " from " + startTime + " to " + endTime + " (" + course.getStudentCourse().getStartTime() + " to " + course.getStudentCourse().getEndTime() + ")");
                // check if the course is currently happening, if so, continue
                if (now >= startTime && now <= endTime) {
                    log.info("Course is currently happening, continuing");
                    continue;
                }
                // if the course is in the future, return it
                if (now < startTime) {
                    log.info("Course is in the future, returning");
                    return course;
                }
            }
            return null;
        });
    }

}
