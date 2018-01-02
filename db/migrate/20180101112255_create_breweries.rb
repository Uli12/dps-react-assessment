class CreateBreweries < ActiveRecord::Migration[5.1]
  def change
    create_table :breweries do |t|
      t.string :name
      t.text :description
      t.string :website
      t.string :images

      t.timestamps
    end
  end
end
