package com.delaidelo.documents.domain;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by andrew on 09.12.17.
 */

@MappedSuperclass
public class AbstractEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "version")
    private Long version;

    @Override
    public boolean equals(Object obj) {
        if(obj == null) {
            return false;
        }
        if (!obj.getClass().equals(this.getClass())) {
            return false;
        }
        AbstractEntity entity = (AbstractEntity) obj;

        return id.equals(entity.id);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
