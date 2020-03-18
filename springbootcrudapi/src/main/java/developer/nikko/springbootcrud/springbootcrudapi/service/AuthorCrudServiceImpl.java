package developer.nikko.springbootcrud.springbootcrudapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import developer.nikko.springbootcrud.springbootcrudapi.model.Author;

@Service
public class AuthorCrudServiceImpl extends CrudServiceImpl<Author> implements CrudService<Author> {

	@Transactional
	@Override
	public List<Author> get() {
		return getDao().get();
	}

	@Transactional
	@Override
	public Author get(int id) {
		return getDao().get(id);
	}

	@Transactional
	@Override
	public void save(Author author) {
		getDao().save(author);
	}

	@Transactional
	@Override
	public void delete(int id) {
		getDao().delete(id);
	}

}
