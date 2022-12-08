package dev.badbird.tdsbconnects.util;

import android.content.Context;
import android.content.SharedPreferences;

public class LoginInfoUtils { // TODO make this secure, not very sure how to do that yet
    public static void saveLogin(String username, String password, Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("login_info", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString("username", username);
        editor.putString("password", password);
        editor.apply();
    }

    public static String[] loadLoginInfo(Context context) throws Exception {
        SharedPreferences sharedPreferences = context.getSharedPreferences("login_info", Context.MODE_PRIVATE);
        String username = sharedPreferences.getString("username", null);
        String password = sharedPreferences.getString("password", null);
        if (username == null || password == null) {
            return null;
        }
        return new String[]{username, password};
    }
    public static void clearLoginInfo(Context context) {
        SharedPreferences sharedPreferences = context.getSharedPreferences("login_info", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
    }
}
