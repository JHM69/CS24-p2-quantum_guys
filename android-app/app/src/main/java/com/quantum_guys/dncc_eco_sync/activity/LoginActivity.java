package com.quantum_guys.dncc_eco_sync.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.quantum_guys.dncc_eco_sync.MainActivity;
import com.quantum_guys.dncc_eco_sync.R;
import com.quantum_guys.dncc_eco_sync.global.UserDB;
import com.quantum_guys.dncc_eco_sync.model.User;
import com.quantum_guys.dncc_eco_sync.model.UserResponse;
import com.quantum_guys.dncc_eco_sync.retrofit.ApiUtils;
import com.quantum_guys.dncc_eco_sync.retrofit.AuthService;
import com.quantum_guys.dncc_eco_sync.view.CustomProgressDialogue;

import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private CustomProgressDialogue mDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mDialog =new CustomProgressDialogue(this);
        mDialog.setCanceledOnTouchOutside(false);
        mDialog.setCancelable(false);

        Button login = findViewById(R.id.buttonLogin);
        login.setOnClickListener(v -> {
            try {
                mDialog.show();
                EditText emailEd = findViewById(R.id.editTextEmail);

                EditText passEd = findViewById(R.id.editTextPassword);


                Map<String, String> loginRequestBody = new HashMap<>();
                loginRequestBody.put("email", emailEd.getText().toString());
                loginRequestBody.put("password", passEd.getText().toString());

                AuthService authService = ApiUtils.getAuthService(this);
                authService.login(loginRequestBody).enqueue(new retrofit2.Callback() {
                    @Override
                    public void onResponse(@NotNull Call call, @NotNull Response response) {

                           Log.d("LoginPage",  response.message() );

                        if (response.isSuccessful()) {

                            Log.d("LoginPage", "Success");

                            User user = ((UserResponse) Objects.requireNonNull(response.body())).user;

                            UserDB.login(getApplicationContext(), user);
                            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(intent);

                            mDialog.dismiss();
                        }else{
                            mDialog.dismiss();
                            Toast.makeText(getApplicationContext(), "Invalid Credentials", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(@NonNull Call call, @NonNull Throwable t) {
                        mDialog.dismiss();
                        Log.d("Error::", t.getMessage());
                        Toast.makeText(getApplicationContext(), "NO Network Connection, try again later", Toast.LENGTH_SHORT).show();
                    }
                });
            } catch (NullPointerException jj) {
                Log.d("SSSF", jj.getMessage());
                finish();
                Toast.makeText(this, "Error", Toast.LENGTH_SHORT).show();
            }

        });
    }
}
