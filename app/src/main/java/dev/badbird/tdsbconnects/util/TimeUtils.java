package dev.badbird.tdsbconnects.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class TimeUtils {
    private static final DateFormat timeFormat = new SimpleDateFormat("hh:mm a");
    public static String formatTime(long timestamp) {
        return timeFormat.format(timestamp);
    }
}
