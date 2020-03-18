package developer.nikko.springbootcrud.springbootcrudapi.dao;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;

public class SessionImp {

	@Autowired
	private EntityManager entityManager;
	
	protected Session getSession() {
		return entityManager.unwrap(Session.class);
	}

}
