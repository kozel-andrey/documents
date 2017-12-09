package com.delaidelo.documents.repositories;

import com.delaidelo.documents.domain.DocumentVersion;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Created by andrew on 09.12.17.
 */
public interface DocumentVersionsRepository extends PagingAndSortingRepository<DocumentVersion, Long>, DocumentVersionRepositoryCustom {

    List<DocumentVersion> findByDocumentId(Long id);

}
