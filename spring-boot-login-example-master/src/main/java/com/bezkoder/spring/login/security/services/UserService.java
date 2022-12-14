package com.bezkoder.spring.login.security.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bezkoder.spring.login.models.ERole;
import com.bezkoder.spring.login.models.Role;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.payload.request.SignupRequest;
import com.bezkoder.spring.login.payload.response.MessageResponse;
import com.bezkoder.spring.login.repository.RoleRepository;
import com.bezkoder.spring.login.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	public Iterable<User> getUsers(){
		return userRepository.findAll();
	}
	
	public ResponseEntity<?> saveUser(SignupRequest signupRequest) {
		if (userRepository.existsByUsername(signupRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error : Username is already taken!"));
		}
		
		if (userRepository.existsByEmail(signupRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error : Email is already taken!"));
		}
		
		// new account
		User newUser = new User(signupRequest.getUsername(),
				                signupRequest.getEmail(),
				                encoder.encode(signupRequest.getPassword()));
		
		//Gestion des roles
		Set<Role> roles = new HashSet<>();
		Set<String> strRoles = signupRequest.getRole();
		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		}else {
			strRoles.forEach(role ->{
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
					     .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
					     .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);
					break;

				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
				     .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				     roles.add(userRole);
					break;
				} 
			});
		}
		
		newUser.setRoles(roles);
		userRepository.save(newUser);
		
		return ResponseEntity.ok(new MessageResponse("User added successfully !"));
	}

}
