package dev.badbird.tdsbconnects.data;

import android.content.Context;

import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;

import dev.badbird.tdsbconnects.TDSBConnectsApp;
import dev.badbird.tdsbconnects.data.model.LoggedInUser;
import dev.badbird.tdsbconnects.util.LoginInfoUtils;
import lombok.Getter;
import lombok.extern.flogger.Flogger;
import lombok.extern.java.Log;

/**
 * Class that requests authentication and user information from the remote data source and
 * maintains an in-memory cache of login status and user credentials information.
 */
@Log
public class LoginRepository {
    @Getter
    private static volatile LoginRepository instance = new LoginRepository();

    // If user credentials will be cached in local storage, it is recommended it be encrypted
    // @see https://developer.android.com/training/articles/keystore
    private LoggedInUser user = null;

    public boolean isLoggedIn() {
        return user != null;
    }

    public void logout(Context context) {
        log.info("Logging out");
        user = null;
        TDSBConnectsApp.getInstance().logout();
        LoginInfoUtils.clearLoginInfo(context);
    }

    private void setLoggedInUser(LoggedInUser user) {
        this.user = user;
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
    }

    public Result<LoggedInUser> login(String username, String password, boolean saveCredentials, Context context) {
        // handle login
        Result<LoggedInUser> result;
        CompletableFuture<LoggedInUser> future = TDSBConnectsApp.getInstance().login(username, password);
        try {
            LoggedInUser user = future.get();
            log.info("Logged in successfully: " + TDSBConnectsApp.getInstance().getTdsbConnects().getUserData());
            result = new Result.Success<>(user);
            if (saveCredentials) {
                LoginInfoUtils.saveLogin(username, password, context);
            }
        } catch (Exception e) {
            log.severe("Failed to log in: " + e);
            if (e.getCause() != null) {
                result = new Result.Error(e.getCause());
            } else result = new Result.Error(e);
        }
        if (result instanceof Result.Success) {
            setLoggedInUser(((Result.Success<LoggedInUser>) result).getData());
        }
        return result;
    }
}