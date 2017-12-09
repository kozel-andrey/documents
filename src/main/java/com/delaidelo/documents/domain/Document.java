package com.delaidelo.documents.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by andrew on 09.12.17.
 */


@Entity
@Table(name = "documents")
public class Document extends AbstractEntity {

    @Column(name= "title")
    private String title;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
