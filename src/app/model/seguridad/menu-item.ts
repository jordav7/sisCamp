export class MenuItem {
  title: string;
  route: string;
  childrens: MenuItem[];

  hasChildren(): boolean {
    return this.childrens? (this.childrens.length > 0 ? true : false) : false;
  }
}
