export default class SwaggerPreparationDataService {

  public static Prepare(obj: any): any {
    obj = this.removeComponente(obj);

    return obj;
  }

  public static removeComponente(obj: any): any {
    delete obj.components;

    return obj;
  }

  public static convertNameToIdArrayParameters(obj: any): any {
    if (obj.paths == undefined) {
      return obj;
    }
    let pathsProperties = Object.getOwnPropertyNames(obj.paths);

    pathsProperties.forEach((x) => {
      let path = obj.paths[x];
      let verbs = Object.getOwnPropertyNames(path);
      verbs.forEach((y) => {
        let newParameters: any = {};
        path[y].parameters.forEach((parameter: any) => {
          newParameters[parameter.name] = parameter;
        });

        path[y].parameters = newParameters;
      });
    });
    return obj;
  }
}