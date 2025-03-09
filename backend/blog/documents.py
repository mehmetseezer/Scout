from django_elasticsearch_dsl import Document, Index, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import Search
from .models import Blog

@registry.register_document
class BlogDocument(Document):
    author = fields.ObjectField(properties={
        'username': fields.TextField(),
        'name': fields.TextField(),
        'profile_image_url': fields.TextField(),
        'followers': fields.TextField(),
    })

    tags = fields.NestedField(properties={
        'name': fields.KeywordField(),
        'url': fields.TextField(),
    })

    class Index:
        name = "blogs"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        }

    class Django:
        model = Blog
        fields = ['title', 'description', 'content', 'url', 'banner', 'read_time', 'date']

    @classmethod
    def get_top_tags(cls, size=10):
        """
        En çok kullanılan etiketleri döndürür.
        :param size: Döndürülecek etiket sayısı (varsayılan: 10)
        :return: En çok kullanılan etiketlerin listesi
        """
        # Elasticsearch sorgusu oluştur
        search = Search(index=cls.Index.name)
    
        # Nested aggregation ekleyin
        search.aggs.bucket(
            'nested_tags',  # Nested aggregation adı
            'nested',  # Nested aggregation türü
            path='tags'  # Nested alanın yolu
        ).bucket(
            'top_tags',  # Aggregation adı
            'terms',  # Aggregation türü
            field='tags.name',  # Keyword alanını kullandık
            size=size  # Kaç etiket döndürülecek
        )

        # Sorguyu çalıştır
        response = search.execute()

        # Sonuçları işle
        top_tags = []
        if hasattr(response.aggregations, 'nested_tags'):
            nested_agg = response.aggregations.nested_tags
            if hasattr(nested_agg, 'top_tags'):
                for bucket in nested_agg.top_tags.buckets:
                    top_tags.append({
                        'tag': bucket.key,  # Etiket adı
                        'count': bucket.doc_count  # Etiketin kullanım sayısı
                    })

        return top_tags
