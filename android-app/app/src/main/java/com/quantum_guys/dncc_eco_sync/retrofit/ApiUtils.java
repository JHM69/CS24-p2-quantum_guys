package com.quantum_guys.dncc_eco_sync.retrofit;

public class ApiUtils {
    public static final String BASE_URL = "http://3.208.28.247:5000";

    public static AuthService getAuthService() {
        return RetrofitClient.getClient(BASE_URL ).create(AuthService.class);
    }

    public static TripService getTripService() {
        return RetrofitClient.getClient(BASE_URL ).create(TripService.class);
    }

}


