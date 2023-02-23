package com.rizeup.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rizeup.backend.model.Example;

// Now we can use JpaRepository’s methods: save(), findOne(), findById(), findAll(), count(), delete(), deleteById()… without implementing these methods.

// We also define custom finder methods:
// – findByPublished(): returns all Tutorials with published having value as input published.
// – findByTitleContaining(): returns all Tutorials which title contains input title.

public interface ExampleRepository extends JpaRepository<Example, Long> {
  List<Example> findByPublished(boolean published);
  List<Example> findByTitleContaining(String title);
}