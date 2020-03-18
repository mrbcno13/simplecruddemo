package developer.nikko.springbootcrud.springbootcrudapi.dao;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import developer.nikko.springbootcrud.springbootcrudapi.model.Book;

@Repository
public class BookDaoImpl extends SessionImp implements CrudDao<Book> {
	
	@Override
	public List<Book> get() {
		List<Book> books = getSession().createQuery("from Book", Book.class).getResultList();
		return books;
	}

	@Override
	public Book get(int id) {
		Book book = getSession().get(Book.class, id);
		return book;
	}

	@Override
	public void save(Book book) {
		getSession().saveOrUpdate(book);
	}

	@Override
	public void delete(int id) {
		Session session = getSession();
		Book book = session.get(Book.class, id);
		session.delete(book);
	}

}
