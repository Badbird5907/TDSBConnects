package dev.badbird.tdsbconnects.ui.timetable;

import android.app.DatePickerDialog;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.DatePicker;

import androidx.annotation.NonNull;
import androidx.core.util.Pair;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.datepicker.MaterialDatePicker;
import com.google.android.material.datepicker.RangeDateSelector;

import java.util.Calendar;
import java.util.Date;

import dev.badbird.tdsbconnects.databinding.FragmentTimetableBinding;
import dev.badbird.tdsbconnects.object.Week;
import lombok.extern.java.Log;

@Log
public class TimeTableFragment extends Fragment {

    private long selectedDate = System.currentTimeMillis();
    private FragmentTimetableBinding binding;
    private Week week = new Week(selectedDate);

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        TimeTableViewModel timeTableViewModel =
                new ViewModelProvider(this).get(TimeTableViewModel.class);

        binding = FragmentTimetableBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        binding.fab.setOnClickListener(view -> openDialog());

        return root;
    }

    public void openDialog() {
        //new DatePickerDialog(getContext(), onDateChange, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH)).show();
        MaterialDatePicker<Long> select_a_date = MaterialDatePicker.Builder.datePicker()
                .setTitleText("Select a date")
                .setSelection(selectedDate)
                .build();
        select_a_date.addOnPositiveButtonClickListener(selection -> {
            log.info("Date selected: " + new Date(selection));
            selectedDate = selection;
            updateWeek();
        });
        select_a_date.show(getParentFragmentManager(), "SELECT_A_DATE");
    }

    public void updateWeek() {
        week = new Week(selectedDate);
        System.out.println("Updated Week - " + week);
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}