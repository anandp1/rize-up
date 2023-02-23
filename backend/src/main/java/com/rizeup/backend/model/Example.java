package com.rizeup.backend.model;

import javax.persistence.*;

@Entity
@Table(name = "Example")
public class Example {
    // – @Entity annotation indicates that the class is a persistent Java class.
    // – @Table annotation provides the table that maps this entity.
    // – @Id annotation is for the primary key.
    // – @GeneratedValue annotation is used to define generation strategy for the primary key. GenerationType.AUTO means Auto Increment field.
    // – @Column annotation is used to define the column in database that maps annotated field.

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "published")
	private boolean published;

	public Example() {

	}
}