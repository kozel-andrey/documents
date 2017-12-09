package com.delaidelo.documents.repositories;

import com.delaidelo.documents.domain.Document;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by andrew on 09.12.17.
 */
public interface DocumentsRepository extends PagingAndSortingRepository<Document, Long> {
}
