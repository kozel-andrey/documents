package com.delaidelo.documents.controllers;

import com.delaidelo.documents.domain.DocumentVersion;
import com.delaidelo.documents.dto.DocumentVersionDto;
import com.delaidelo.documents.repositories.DocumentVersionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/by-document")
    public List<DocumentVersionDto> getVersions(@PathVariable("id") Long docId) {
        List<DocumentVersion> versions = versionsRepository.findByDocumentId(docId);
        List<DocumentVersionDto> dtos = versions.stream().map(DocumentVersion::getDto).collect(Collectors.toList());
        return dtos;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}/paragraph")
    public List<String> getParagraph(@PathVariable("id") Long id,
                                     @RequestParam("paragraphNumber") Integer paragraphNumber,
                                     @RequestParam("linesCount") Integer linesCount) {
        return versionsRepository.findParagraph(id, paragraphNumber, linesCount);
    }


}
