DROP TABLE IF EXISTS document_versions;
DROP TABLE IF EXISTS documents;
CREATE TABLE IF NOT EXISTS documents (

  id BIGSERIAL NOT NULL,
  version BIGINT,
  title VARCHAR(255),

  CONSTRAINT pk_documents_id PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS document_versions (

  id BIGSERIAL NOT NULL,
  version BIGINT,
  document_id BIGINT NOT NULL,
  document_version VARCHAR(255),
  description VARCHAR(1024),
  content TEXT,

  CONSTRAINT pk_document_version_id PRIMARY KEY (id),
  CONSTRAINT pk_document_id FOREIGN KEY (document_id) REFERENCES documents (id)

);

CREATE OR REPLACE FUNCTION get_part_of_text(version_id BIGINT, paragraph_number INTEGER, lines_count INTEGER)
  RETURNS SETOF TEXT LANGUAGE 'plpgsql' AS
'
BEGIN
  RETURN QUERY SELECT regexp_split_to_table(content :: TEXT, ''\\n'') FROM document_versions dv WHERE dv.id = version_id LIMIT lines_count OFFSET paragraph_number;
END
';