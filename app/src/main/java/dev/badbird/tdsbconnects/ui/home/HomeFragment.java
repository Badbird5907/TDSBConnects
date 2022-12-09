package dev.badbird.tdsbconnects.ui.home;

import android.app.Activity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import java.util.Arrays;
import java.util.stream.Stream;

import dev.badbird.tdsbconnects.R;
import dev.badbird.tdsbconnects.TDSBConnectsApp;
import dev.badbird.tdsbconnects.databinding.FragmentHomeBinding;
import dev.badbird.tdsbconnects.util.TimeUtils;
import dev.badbird.tdsbconnectsapi.TDSBConnects;
import dev.badbird.tdsbconnectsapi.schema.response.impl.TimeTableResponse;
import dev.badbird.tdsbconnectsapi.schema.response.impl.UserResponse;
import dev.badbird.tdsbconnectsapi.util.Utilities;

public class HomeFragment extends Fragment {

    private FragmentHomeBinding binding;

    private int schoolCode = TDSBConnectsApp.getInstance().getTdsbConnects().getUserData().getSchoolID();

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        TDSBConnects api = TDSBConnectsApp.getInstance().getTdsbConnects();
        UserResponse.SchoolList school = Stream.of(api.getUserData().getSchoolList()).filter(
                s -> s.getSchoolCode() == schoolCode
        ).findFirst().orElse(null);

        TextView textView = binding.textHome;
        textView.setText(String.format(getString(R.string.home_header), school == null ? "Unknown (Failed to fetch, please report)" : school.getSchoolName()));


        TextView nextClassCode = binding.nextClassCourseCode;
        TextView nextClassDesc = binding.nextClassCourseDesc;
        TextView nextClassTime = binding.nextClassCourseTime;
        TextView nextClassRoom = binding.nextClassRoom;
        TDSBConnectsApp.getInstance().getNextCourse(schoolCode).thenAccept(course -> {
             getActivity().runOnUiThread(()-> {
                if (course == null) {
                    nextClassCode.setText(R.string.none);
                } else {
                    nextClassCode.setText(course.getStudentCourse().getClassCode());
                    nextClassDesc.setText(course.getStudentCourse().getClassName());
                    nextClassDesc.setVisibility(View.VISIBLE);

                    long startTimestamp = Utilities.parseDateToUnixMillis(course.getStudentCourse().getStartTime());
                    long endTimestamp = Utilities.parseDateToUnixMillis(course.getStudentCourse().getEndTime());
                    String start = TimeUtils.formatTime(startTimestamp), end = TimeUtils.formatTime(endTimestamp);
                    nextClassTime.setText(String.format(getString(R.string.home_next_class_course_time), start, end));
                    nextClassTime.setVisibility(View.VISIBLE);

                    nextClassRoom.setText(String.format(getString(R.string.home_next_class_room), course.getStudentCourse().getRoomNo()));
                    nextClassRoom.setVisibility(View.VISIBLE);
                }
            });
        }).exceptionally(e -> {
            e.printStackTrace();
            nextClassCode.setText(R.string.error);
            return null;
        });
        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}