package developer.nikko.springbootcrud.springbootcrudapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface CrudService<T> {

	List<T> get();

	T get(int id);

	void save(T entity);

	void delete(int id);

}
