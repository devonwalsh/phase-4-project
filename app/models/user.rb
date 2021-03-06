class User < ApplicationRecord
    has_many :recipients
    has_many :gifts, through: :recipients
    
    has_secure_password
    validates :name, presence: true, uniqueness: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
end
