package com.delaidelo.documents.repositories;

import javassist.bytecode.EnclosingMethodAttribute;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by andrew on 09.12.17.
 */
public class DocumentVersionsRepositoryImpl implements DocumentVersionRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<String> findParagraph(Long id, Integer paragraphNumber) {
        StoredProcedureQuery getParagraph = em.createStoredProcedureQuery("get_part_of_text");
        getParagraph.registerStoredProcedureParameter(1, Long.class, ParameterMode.IN);
        getParagraph.registerStoredProcedureParameter(2, Integer.class, ParameterMode.IN);
        getParagraph.setParameter(1, id);
        getParagraph.setParameter(2, paragraphNumber);
        getParagraph.execute();
        List<Object> strings = getParagraph.getResultList();
        return strings.stream().map(Object::toString).collect(Collectors.toList());
    }
}
