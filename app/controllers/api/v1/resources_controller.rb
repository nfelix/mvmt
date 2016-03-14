class Api::V1::ResourcesController < Api::V1::BaseController
  def show
    resource = Resource.find(params[:id])
    render(json: Api::V1::ResourceSerializer.new(resource).to_json)
  end

  def update
    resource = Resource.find(params[:id])

    if !resource.update_attributes(update_params)
      return api_error(status: 422, errors: user.errors)
    else
      render :nothing => true, :status => 200
    end
  end


  private

  def create_params
    params.require(:resource).permit(
        :id, :name, :clickthrough
    )
  end

  def update_params
    create_params
  end
end
