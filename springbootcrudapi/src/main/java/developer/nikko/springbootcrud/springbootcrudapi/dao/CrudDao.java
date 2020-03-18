package developer.nikko.springbootcrud.springbootcrudapi.dao;

import java.util.List;

public interface CrudDao<T> {

	List<T> get();

	T get(int id);

	void save(T entity);

	void delete(int id);

}
