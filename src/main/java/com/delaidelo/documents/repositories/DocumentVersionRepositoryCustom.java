package com.delaidelo.documents.repositories;

import com.delaidelo.documents.controllers.DocumentVersionController;

import java.util.List;

/**
 * Created by andrew on 09.12.17.
 */
public interface DocumentVersionRepositoryCustom {

    List<String> findParagraph(Long id, Integer paragraphNumber);

}
