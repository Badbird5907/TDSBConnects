package dev.badbird.tdsbconnects.ui.main;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import dev.badbird.tdsbconnects.R;
import dev.badbird.tdsbconnects.TDSBConnectsApp;
import dev.badbird.tdsbconnects.data.LoginRepository;
import dev.badbird.tdsbconnects.databinding.ActivityMainBinding;
import dev.badbird.tdsbconnects.ui.login.LoginActivity;
import lombok.extern.java.Log;

@Log
public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        binding = ActivityMainBinding.inflate(getLayoutInflater());

        final Button logoutButton = binding.logout;
        final TextView welcomeText = binding.welcomeText;

        welcomeText.setText(String.format(getString(R.string.welcome_text), TDSBConnectsApp.getInstance().getTdsbConnects().getUserData().getUserName()));

        logoutButton.setOnClickListener(v -> {
            log.info("Logging out");
            LoginRepository.getInstance().logout(this);
            startActivity(new Intent(this, LoginActivity.class));
            finish();
        });

        setContentView(binding.getRoot());

    }
}