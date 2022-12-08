package dev.badbird.tdsbconnects;

import java.util.concurrent.CompletableFuture;

import dev.badbird.tdsbconnects.data.model.LoggedInUser;
import dev.badbird.tdsbconnectsapi.TDSBConnects;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
        });
        return future;
    }

    public void logout() {
        // TODO: do nothing for now, logout endpoint seems to be broken anyway
    }
}
