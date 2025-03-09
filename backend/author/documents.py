from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry
from author.models import Author

@registry.register_document
class AuthorDocument(Document):
    class Django:
        model = Author  # Author modelini Elasticsearch ile ilişkilendiriyoruz
        fields = ['username', 'name', 'profile_image_url', 'followers']

    class Index:
        name = "authors"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        }