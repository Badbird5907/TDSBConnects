package dev.badbird.tdsbconnects.data;

import java.util.concurrent.CompletableFuture;
import java.util.logging.Logger;

import dev.badbird.tdsbconnects.TDSBConnectsApp;
import dev.badbird.tdsbconnects.data.model.LoggedInUser;
import lombok.extern.flogger.Flogger;
import lombok.extern.java.Log;

/**
 * Class that requests authentication and user information from the remote data source and
 * maintains an in-memory cache of login status and user credentials information.
 */
@Log
public class LoginRepository {

    private static volatile LoginRepository instance;

    // If user credentials will be cached in local storage, it is recommended it be encrypted
    // @see https://developer.android.com/training/articles/keystore
    private LoggedInUser user = null;

    public boolean isLoggedIn() {
        return user != null;
    }

    public void logout() {
        user = null;
        TDSBConnectsApp.getInstance().logout();
    }

    private void setLoggedInUser(LoggedInUser user) {
        this.user = user;
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
    }

    public Result<LoggedInUser> login(String username, String password) {
        // handle login
        Result<LoggedInUser> result;
        try {
            CompletableFuture<LoggedInUser> future = TDSBConnectsApp.getInstance().login(username, password);
            LoggedInUser user = future.get();
            log.info("Logged in successfully: " + TDSBConnectsApp.getInstance().getTdsbConnects().getUserData());
            result = new Result.Success<>(user);
        } catch (Exception e) {
            log.severe("Failed to log in: " + e);
            result = new Result.Error(new Exception("Error logging in"));
        }
        if (result instanceof Result.Success) {
            setLoggedInUser(((Result.Success<LoggedInUser>) result).getData());
        }
        return result;
    }
}