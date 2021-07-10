class GiftSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :url

  belongs_to :recipient
end
