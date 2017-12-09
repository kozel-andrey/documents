package com.delaidelo.documents.controllers;

import com.delaidelo.documents.domain.Document;
import com.delaidelo.documents.domain.DocumentVersion;
import com.delaidelo.documents.repositories.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * Created by andrew on 09.12.17.
 */

@RestController
@RequestMapping("/documents")
public class DocumentsController {

    @Autowired
    private DocumentsRepository documentsRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<Document> getDocuments() {
        Iterable<Document> documents = documentsRepository.findAll();
        List<Document> list = new ArrayList<>();
        documents.forEach(list::add);
        return list;
    }

}
