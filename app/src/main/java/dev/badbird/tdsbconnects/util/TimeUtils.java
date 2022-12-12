package dev.badbird.tdsbconnects.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class TimeUtils {
    private static final DateFormat timeFormat = new SimpleDateFormat("hh:mm a");
    public static String formatTime(long timestamp) {
        return timeFormat.format(timestamp);
    }

    private static final DateFormat dateFormat = new SimpleDateFormat("MMM dd");
    public static String formatDate(long date) {
        return dateFormat.format(date);
    }
}
