package com.lemonmul.planetdhance.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemonmul.planetdhance.security.ErrorCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        int exception = (int)request.getAttribute("exception");
        ErrorCode errorCode;

        if(exception == ErrorCode.EXPIRED_TOKEN.getCode()){
            errorCode = ErrorCode.EXPIRED_TOKEN;
            setResponse(response, errorCode);
        }
    }

    private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().println("{ \"message\" : \"" + errorCode.getMessage()
                + "\", \"code\" : \"" +  errorCode.getCode()
                + "\", \"status\" : " + errorCode.getMessage()
                + ", \"errors\" : [ ] }");
    }
}
