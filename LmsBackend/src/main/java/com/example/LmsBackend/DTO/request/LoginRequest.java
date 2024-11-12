package com.example.LmsBackend.DTO.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginRequest {

    private String userName;
    private String password;
}
