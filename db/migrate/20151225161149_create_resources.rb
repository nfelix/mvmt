class CreateResources < ActiveRecord::Migration
  def change
    create_table :resources do |t|
      t.string :name
      t.string :logo
      t.string :website
      t.string :affilatelink
      t.boolean :affiliate

      t.timestamps
    end
  end
end
