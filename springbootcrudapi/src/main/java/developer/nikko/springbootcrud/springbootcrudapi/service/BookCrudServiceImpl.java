package developer.nikko.springbootcrud.springbootcrudapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import developer.nikko.springbootcrud.springbootcrudapi.model.Book;

@Service
public class BookCrudServiceImpl extends CrudServiceImpl<Book> implements CrudService<Book> {

	@Transactional
	@Override
	public List<Book> get() {
		return getDao().get();
	}

	@Transactional
	@Override
	public Book get(int id) {
		return getDao().get(id);
	}

	@Transactional
	@Override
	public void save(Book book) {
		getDao().save(book);
	}

	@Transactional
	@Override
	public void delete(int id) {
		getDao().delete(id);
	}

}
