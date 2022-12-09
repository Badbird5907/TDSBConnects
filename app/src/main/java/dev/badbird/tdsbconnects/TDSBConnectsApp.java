package dev.badbird.tdsbconnects;

import android.annotation.SuppressLint;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import dev.badbird.tdsbconnects.data.model.LoggedInUser;
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
    public CompletableFuture<TimeTableResponse.Course[]> getCoursesForDay(Date date, int schoolId) { // TODO caching, this is very important!
        String dateStr = dateFormat.format(date); // this is so braindead
        TimeTableRequest request = new TimeTableRequest(schoolId, dateStr);
        CompletableFuture<TimeTableResponse.Course[]> future = new CompletableFuture<>();
        tdsbConnects.call(request).thenAccept(response -> {
            TimeTableResponse.Course[] courses = response.getCourseTable().toArray(new TimeTableResponse.Course[0]);
            future.complete(courses);
        });
        return future;
    }

    public CompletableFuture<TimeTableResponse.Course> getNextCourse(int schoolId) {
        return getCoursesForDay(new Date(), schoolId).thenApply(courses -> {
            long now = System.currentTimeMillis();
            for (TimeTableResponse.Course course : courses) {
                long startTime = Utilities.parseDateToUnixMillis(course.getStudentCourse().getStartTime());
                long endTime = Utilities.parseDateToUnixMillis(course.getStudentCourse().getEndTime());
                // check if the course is currently happening, if so, continue
                if (now >= startTime && now <= endTime) {
                    continue;
                }
                // if the course is in the future, return it
                if (now < startTime) {
                    return course;
                }
            }
            return null;
        });
    }

}
