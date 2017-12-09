package com.delaidelo.documents.dto;

/**
 * Created by andrew on 09.12.17.
 */
public class DocumentVersionDto {

    private Long id;
    private String documentVersion;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentVersion() {
        return documentVersion;
    }

    public void setDocumentVersion(String documentVersion) {
        this.documentVersion = documentVersion;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
