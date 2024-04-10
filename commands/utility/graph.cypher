MATCH (n:Node)-[r:LIVES_IN]->(d:Datacenter)
  MATCH (n:Node)-[s:SHARES_WITH]->(m:Node)
  MATCH (n:Node)-[t:DEPENDS_OF]->(o:Pool)
    MATCH (o:Pool)-[t:DEPENDS_OF]->(q:Nodes)
WHERE d.Name = 'edc01bhb'
RETURN d, n, m, o, q