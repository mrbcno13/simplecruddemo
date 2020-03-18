package developer.nikko.springbootcrud.springbootcrudapi.service;

import org.springframework.beans.factory.annotation.Autowired;

import developer.nikko.springbootcrud.springbootcrudapi.dao.CrudDao;

public class CrudServiceImpl<T> {

	@Autowired
	private CrudDao<T> dao;

	public CrudDao<T> getDao() {
		return dao;
	}

	public void setDao(CrudDao<T> dao) {
		this.dao = dao;
	}

}
