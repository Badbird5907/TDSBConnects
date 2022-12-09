package dev.badbird.tdsbconnects.ui.debug;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import org.w3c.dom.Text;

import dev.badbird.tdsbconnects.BuildConfig;
import dev.badbird.tdsbconnects.databinding.FragmentDebugBinding;

public class DebugFragment extends Fragment {
    private FragmentDebugBinding binding;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        binding = FragmentDebugBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        TextView buildType = binding.debugBuildType;
        buildType.setText(String.format(
                buildType.getText().toString(),
                BuildConfig.BUILD_TYPE
        ));

        TextView versionName = binding.debugVersionName;
        versionName.setText(String.format(
                versionName.getText().toString(),
                BuildConfig.VERSION_NAME
        ));

        TextView applicationId = binding.debugApplicationId;
        applicationId.setText(String.format(
                applicationId.getText().toString(),
                BuildConfig.APPLICATION_ID
        ));

        TextView gitHash = binding.debugGitHash;
        gitHash.setText(String.format(
                gitHash.getText().toString(),
                BuildConfig.GIT_HASH
        ));

        TextView versionCode = binding.debugVersionCode;
        versionCode.setText(String.format(
                versionCode.getText().toString(),
                BuildConfig.VERSION_CODE
        ));

        TextView buildTime = binding.debugBuildTime;
        buildTime.setText(String.format(
                buildTime.getText().toString(),
                BuildConfig.BUILD_TIMESTAMP
        ));

        return root;
    }
}