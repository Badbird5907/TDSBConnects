package dev.badbird.tdsbconnects.ui.home;

import android.os.Bundle;
import android.view.Menu;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.preference.PreferenceFragmentCompat;

import com.google.android.material.navigation.NavigationView;

import dev.badbird.tdsbconnects.R;
import dev.badbird.tdsbconnects.TDSBConnectsApp;
import dev.badbird.tdsbconnects.databinding.ActivityMainBinding;
import lombok.extern.java.Log;

@Log
public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;
    private AppBarConfiguration mAppBarConfiguration;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());

        setContentView(binding.getRoot());
        setSupportActionBar(binding.appBarMain.toolbar);
        DrawerLayout drawer = binding.drawerLayout;
        NavigationView navigationView = binding.navView;

        // get the textview with the id nav_header_title
        TextView navHeaderTitle = navigationView.getHeaderView(0).findViewById(R.id.nav_header_title);
        navHeaderTitle.setText(getString(R.string.nav_header_title, TDSBConnectsApp.getInstance().getTdsbConnects().getUserData().getUserName()));

        TextView navHeaderSubtitle = navigationView.getHeaderView(0).findViewById(R.id.nav_header_subtitle);
        navHeaderSubtitle.setText(getString(R.string.nav_header_subtitle, TDSBConnectsApp.getInstance().getTdsbConnects().getUsername()));

        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_timetable/*R.id.nav_gallery, R.id.nav_slideshow*/)
                .setOpenableLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        // check if we are in the settings fragment
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        /*
        Fragment currentFragment = getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment_content_main);
        if (currentFragment instanceof PreferenceFragmentCompat) {
            return true;
        }
         */
        getMenuInflater().inflate(R.menu.options, menu);


        menu.findItem(R.id.action_settings).setOnMenuItemClickListener(item -> {
            // open SettingsFragment
            navController.navigate(R.id.nav_settings);
            return true;
        });

        menu.findItem(R.id.action_debug).setOnMenuItemClickListener(item -> {
            // open DebugFragment
            navController.navigate(R.id.action_debug);
            return true;
        });
        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }
}