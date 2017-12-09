package com.delaidelo.documents.controllers;

import com.delaidelo.documents.domain.DocumentVersion;
import com.delaidelo.documents.dto.DocumentVersionDto;
import com.delaidelo.documents.repositories.DocumentVersionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by andrew on 09.12.17.
 */

@RestController
@RequestMapping("/versions")
public class DocumentVersionController {

    @Autowired
    private DocumentVersionsRepository versionsRepository;

    @RequestMapping(method= RequestMethod.GET, value="/{id}/by-document")
    public List<DocumentVersionDto> getVersions(@PathVariable("id") Long id) {
        List<DocumentVersion> versions = versionsRepository.findByDocumentId(id);
        List<DocumentVersionDto> dtos = versions.stream().map(DocumentVersion::getDto).collect(Collectors.toList());
        return dtos;
    }


}
