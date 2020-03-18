package developer.nikko.springbootcrud.springbootcrudapi.dao;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import developer.nikko.springbootcrud.springbootcrudapi.model.Author;

@Repository
public class AuthorDaoImpl extends SessionImp implements CrudDao<Author> {
	
	@Override
	public List<Author> get() {
		List<Author> list = getSession().createQuery("from Author", Author.class).getResultList();
		return list;
	}

	@Override
	public Author get(int id) {
		Author author = getSession().get(Author.class, id);
		return author;
	}

	@Override
	public void save(Author author) {
		getSession().saveOrUpdate(author);
	}

	@Override
	public void delete(int id) {
		Session session = getSession();
		Author author = session.get(Author.class, id);
		session.delete(author);
	}

}
