package dev.badbird.tdsbconnects.ui.main;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import dev.badbird.tdsbconnects.R;
import dev.badbird.tdsbconnects.data.LoginRepository;
import dev.badbird.tdsbconnects.databinding.ActivityMainBinding;
import dev.badbird.tdsbconnects.ui.login.LoginActivity;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        binding = ActivityMainBinding.inflate(getLayoutInflater());

        final Button logoutButton = binding.logout;

        logoutButton.setOnClickListener(v -> {
            LoginRepository.getInstance().logout();
            startActivity(new Intent(this, LoginActivity.class));
            finish();
        });
    }
}