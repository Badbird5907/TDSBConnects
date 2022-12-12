package dev.badbird.tdsbconnects.object;

import java.util.Calendar;

import lombok.Getter;

public class Week {
    @Getter
    private long start, end;

    public Week(long start, long end) {
        this.start = start;
        this.end = end;
    }

    public Week(long date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        this.start = calendar.getTimeInMillis();
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
        this.end = calendar.getTimeInMillis();
    }

    public Calendar startAsCalendar() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(start);
        return calendar;
    }

    public Calendar endAsCalendar() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(end);
        return calendar;
    }

    @Override
    public String toString() {
        return "Start: " + startAsCalendar().getTime() + " End: " + endAsCalendar().getTime();
    }
}
