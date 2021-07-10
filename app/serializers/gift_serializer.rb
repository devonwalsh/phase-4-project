class GiftSerializer < ActiveModel::Serializer
  attributes :id, :name, :price

  belongs_to :recipient
end
