package com.bezkoder.spring.login.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.payload.request.SignupRequest;
import com.bezkoder.spring.login.security.services.UserService;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/web")
public class UserController {
	
	  @Autowired
	  private UserService userService;

	  @GetMapping("/users")
      @PreAuthorize("hasRole('ADMIN')")
	  public Iterable<User> getUsers(){
		  return userService.getUsers();
	  }
	  
	  @PostMapping("/add_user")
	  @PreAuthorize("hasRole('ADMIN')")
	  public ResponseEntity<?> saveUser(@Valid @RequestBody SignupRequest signupRequest){
		  return userService.saveUser(signupRequest);
	  }
}
