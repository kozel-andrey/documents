package com.delaidelo.documents.domain;

import com.delaidelo.documents.dto.DocumentVersionDto;

import javax.persistence.*;

/**
 * Created by andrew on 09.12.17.
 */

@Entity
@Table(name = "document_versions")
public class DocumentVersion extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_id")
    private Document document;

    @Column(name = "document_version")
    private String documentVersion;

    @Column(name = "description")
    private String description;

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public String getDocumentVersion() {
        return documentVersion;
    }

    public void setDocumentVersion(String documentVersion) {
        this.documentVersion = documentVersion;
    }

    public DocumentVersionDto getDto() {
        DocumentVersionDto dto = new DocumentVersionDto();
        dto.setId(getId());
        dto.setDescription(description);
        dto.setDocumentVersion(documentVersion);
        return dto;
    }

}
