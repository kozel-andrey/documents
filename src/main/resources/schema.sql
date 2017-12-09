CREATE TABLE IF NOT EXISTS documents (

  id BIGSERIAL NOT NULL,
  version BIGINT,
  title VARCHAR(255),

  CONSTRAINT pk_documents_id PRIMARY KEY (id)

);

CREATE TABLE IF NOT EXISTS document_versions (

  id BIGSERIAL NOT NULL,
  document_id BIGINT NOT NULL,
  document_version VARCHAR(255),
  description VARCHAR(1024),
  content TEXT,

  CONSTRAINT pk_document_version_id PRIMARY KEY (id),
  CONSTRAINT pk_document_id FOREIGN KEY (document_id) REFERENCES documents (id)

);

CREATE OR REPLACE FUNCTION get_part_of_text(version_id BIGINT, paragraph_number INTEGER)
  RETURNS TEXT [] LANGUAGE 'plpgsql' AS
'
DECLARE
  arr TEXT[];
BEGIN

  SELECT INTO arr regexp_split_to_array(content :: TEXT, E''\\s+'') FROM document_versions dv WHERE dv.id = version_id LIMIT 1 OFFSET paragraph_number;

  RETURN arr;

END
';